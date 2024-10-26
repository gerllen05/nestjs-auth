export interface GoogleProfile {
  provider: string;
  sub: string; // Google subject identifier (unique ID)
  id: string; // User ID
  displayName: string; // Display name of the user
  name: {
    givenName: string;
    familyName: string;
  };
  given_name: string; // First name
  family_name: string; // Last name
  email_verified: boolean; // Whether the email is verified
  verified: boolean; // Overall verification status
  email: string; // Primary email address
  emails: {
    value: string;
    type: string; // Type of email, e.g., 'account'
  }[];
  photos: {
    value: string; // URL of the photo
    type: string; // Type of photo, e.g., 'default'
  }[];
  picture: string; // Profile picture URL
  _raw: string; // Raw JSON string of the profile data
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
  };
}