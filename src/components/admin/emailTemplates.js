export const EMAIL_TEMPLATES = [
  {
    id: 'simple-announcement',
    name: 'Simple Announcement',
    subject: 'A quick update from Concierge Nurse Business Society',
    html: `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="color: #0A1628; font-size: 28px; margin-bottom: 16px;">Announcement Title</h1>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi {firstName},</p>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">Your message goes here. Share your news, update, or announcement with your community.</p>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">Best,<br>Tracy Pekurny<br>Concierge Nurse Business Society</p>
</div>`,
  },
  {
    id: 'event-invite',
    name: 'Event / Workshop Invite',
    subject: "You're invited",
    html: `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <p style="color: #C9A84C; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">You're Invited</p>
    <h1 style="color: #0A1628; font-size: 32px; margin: 8px 0;">Event Name Here</h1>
    <p style="color: #6B7280; font-size: 16px;">Date & Time</p>
  </div>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi {firstName},</p>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">You're invited to an exclusive event. Describe what they'll learn, who it's for, and why they should attend.</p>
  <div style="text-align: center; margin: 32px 0;">
    <a href="#" style="background: #C9A84C; color: #0A1628; padding: 14px 32px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 1px;">REGISTER NOW</a>
  </div>
  <p style="color: #999; font-size: 13px; text-align: center;">Concierge Nurse Business Society</p>
</div>`,
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    subject: "This week at Concierge Nurse Business Society",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #0A1628; padding: 32px; text-align: center;">
    <h1 style="color: #C9A84C; font-size: 24px; margin: 0;">Concierge Nurse Business Society</h1>
    <p style="color: rgba(255,255,255,0.5); font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 8px;">Newsletter</p>
  </div>
  <div style="padding: 32px 20px;">
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi {firstName},</p>
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Here's what's new this week:</p>
    <h2 style="color: #0A1628; font-size: 20px; margin-top: 24px;">Update 1</h2>
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Description of the first update or news item.</p>
    <h2 style="color: #0A1628; font-size: 20px; margin-top: 24px;">Update 2</h2>
    <p style="color: #333; font-size: 16px; line-height: 1.6;">Description of the second update or news item.</p>
    <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0;">
    <p style="color: #999; font-size: 13px; text-align: center;">Concierge Nurse Business Society<br>conciergenursesociety.com</p>
  </div>
</div>`,
  },
  {
    id: 'accelerator-enrollment',
    name: 'Accelerator Enrollment Open',
    subject: 'Enrollment is open — The Accelerator',
    html: `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="color: #0A1628; font-size: 28px; text-align: center;">Enrollment Is Open</h1>
  <div style="width: 40px; height: 2px; background: #C9A84C; margin: 16px auto;"></div>
  <p style="color: #333; font-size: 16px; line-height: 1.6; text-align: center;">The Concierge Nurse Business Method Accelerator</p>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">Hi {firstName},</p>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">The next cohort of the Accelerator is now open for enrollment. This is a 6-week live program where you build your entire concierge nursing business from the ground up.</p>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">Spots are limited. If you've been waiting for the right time, this is it.</p>
  <div style="text-align: center; margin: 32px 0;">
    <a href="https://www.conciergenursesociety.com/accelerator" style="background: #C9A84C; color: #0A1628; padding: 14px 32px; text-decoration: none; font-weight: bold; font-size: 14px; letter-spacing: 1px;">ENROLL NOW</a>
  </div>
  <p style="color: #333; font-size: 16px; line-height: 1.6;">See you inside,<br>Tracy Pekurny</p>
</div>`,
  },
];
