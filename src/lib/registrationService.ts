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
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

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
      const { error } = await supabase
        .from('registrations')
        .update({ payment_verified: verified })
        .eq('id', registrationId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating payment verification:', error);
      throw new Error('Failed to update payment verification');
    }
  }
}
