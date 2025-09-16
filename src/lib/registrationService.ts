import { supabase, Registration } from './supabase';

export class RegistrationService {
  /**
   * Upload payment screenshot to Supabase storage
   */
  static async uploadPaymentScreenshot(file: File, userId: string): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}_${Date.now()}.${fileExt}`;
      const filePath = `payment-screenshots/${fileName}`;

      const { error } = await supabase.storage
        .from('registration-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('registration-files')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload payment screenshot');
    }
  }

  /**
   * Create a new registration record
   */
  static async createRegistration(registrationData: Omit<Registration, 'id' | 'created_at'>): Promise<Registration> {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([registrationData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error creating registration:', error);
      throw new Error('Failed to create registration');
    }
  }

  /**
   * Submit complete registration with file upload
   */
  static async submitRegistration(formData: {
    fullName: string;
    phoneNumber: string;
    email: string;
    college: string;
    year: string;
    startupIdea: string;
    paymentScreenshot: File;
  }): Promise<Registration> {
    try {
      // Generate unique ID for this registration
      const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Upload payment screenshot first
      const paymentScreenshotUrl = await this.uploadPaymentScreenshot(
        formData.paymentScreenshot, 
        tempId
      );

      // Prepare registration data
      const registrationData: Omit<Registration, 'id' | 'created_at'> = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        college: formData.college,
        year: formData.year,
        startup_idea: formData.startupIdea || undefined,
        payment_screenshot_url: paymentScreenshotUrl,
        payment_verified: false
      };

      // Create registration record
      const registration = await this.createRegistration(registrationData);

      return registration;
    } catch (error) {
      console.error('Error submitting registration:', error);
      throw error;
    }
  }

  /**
   * Get all registrations (for admin panel)
   */
  static async getAllRegistrations(): Promise<Registration[]> {
    try {
      console.log('Fetching all registrations from database...');
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error in getAllRegistrations:', error);
        throw error;
      }

      console.log('Raw data from database:', data);
      console.log('Sample registration fields:', data?.[0] ? Object.keys(data[0]) : 'No data');

      return data || [];
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw new Error('Failed to fetch registrations');
    }
  }

  /**
   * Update payment verification status
   */
  static async updatePaymentVerification(registrationId: string, verified: boolean): Promise<void> {
    try {
      console.log(`Updating registration ${registrationId} with payment_verified: ${verified}`);
      
      const { data, error } = await supabase
        .from('registrations')
        .update({ 
          payment_verified: verified,
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error(`No registration found with ID: ${registrationId}`);
      }

      console.log('Successfully updated registration:', data[0]);
    } catch (error) {
      console.error('Error updating payment verification:', error);
      throw error instanceof Error ? error : new Error('Failed to update payment verification');
    }
  }

  /**
   * Update registration status (pending/approved/rejected)
   */
  static async updateRegistrationStatus(registrationId: string, status: 'pending' | 'approved' | 'rejected'): Promise<void> {
    try {
      console.log(`Updating registration ${registrationId} with status: ${status}`);
      
      const { data, error } = await supabase
        .from('registrations')
        .update({ 
          status: status,
          payment_verified: status === 'approved',
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Database error: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.error(`No registration found with ID: ${registrationId}`);
        throw new Error(`No registration found with ID: ${registrationId}`);
      }

      console.log('Database update result:', data);
      if (!('status' in data[0])) {
        console.error('Status field missing in returned data:', data[0]);
      } else {
        console.log(`Updated status for ${registrationId}:`, data[0].status);
      }
      console.log('Full registration object after update:', JSON.stringify(data[0], null, 2));
    } catch (error) {
      console.error('Error updating registration status:', error);
      throw error instanceof Error ? error : new Error('Failed to update registration status');
    }
  }

  /**
   * Mark registration as rejected using startup_idea field
   */
  static async markAsRejected(registrationId: string): Promise<void> {
    try {
      console.log(`Marking registration ${registrationId} as rejected`);
      
      // First get the current startup_idea to preserve it
      const { data: currentData, error: fetchError } = await supabase
        .from('registrations')
        .select('startup_idea')
        .eq('id', registrationId)
        .single();

      if (fetchError) {
        throw new Error(`Failed to fetch current data: ${fetchError.message}`);
      }

      // Store original startup_idea with rejection marker
      const originalIdea = currentData?.startup_idea || '';
      const rejectionMarker = `[REJECTED]${originalIdea}`;

      const { error } = await supabase
        .from('registrations')
        .update({ 
          startup_idea: rejectionMarker,
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Successfully marked registration as rejected');
    } catch (error) {
      console.error('Error marking as rejected:', error);
      throw error instanceof Error ? error : new Error('Failed to mark as rejected');
    }
  }

  /**
   * Clear rejection marker and restore original startup_idea
   */
  static async clearRejectionMarker(registrationId: string): Promise<void> {
    try {
      console.log(`Clearing rejection marker for registration ${registrationId}`);
      
      // Get current startup_idea
      const { data: currentData, error: fetchError } = await supabase
        .from('registrations')
        .select('startup_idea')
        .eq('id', registrationId)
        .single();

      if (fetchError) {
        throw new Error(`Failed to fetch current data: ${fetchError.message}`);
      }

      const currentIdea = currentData?.startup_idea || '';
      
      // Remove rejection marker if it exists
      const cleanedIdea = currentIdea.startsWith('[REJECTED]') 
        ? currentIdea.replace('[REJECTED]', '') 
        : currentIdea;

      const { error } = await supabase
        .from('registrations')
        .update({ 
          startup_idea: cleanedIdea,
          updated_at: new Date().toISOString()
        })
        .eq('id', registrationId);

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      console.log('Successfully cleared rejection marker');
    } catch (error) {
      console.error('Error clearing rejection marker:', error);
      throw error instanceof Error ? error : new Error('Failed to clear rejection marker');
    }
  }
}
