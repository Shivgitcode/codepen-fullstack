
const mailContent = async (createuser) => {
    const mailOptions = {
        from: "shivneeraj2004@gmail.com",
        to: createuser.email,
        subject: "Thanks by team codepen",
        html: `
        <p>Hi ${createuser.username.split(" ")[0]},</p>
        <p>Welcome to CodePen! We're delighted to have you join our community.</p>
        <p>At CodePen, you can create, share, and explore amazing code projects. To help you get started, here are a few things you can do:</p>
        <ul>
            <li><strong>Create Your First Pen</strong>: Start coding right away by creating a new pen.</li>
            <li><strong>Explore Our Community</strong>: Check out what others are creating and get inspired.</li>
            <li><strong>Personalize Your Profile</strong>: Set up your profile to showcase your work and connect with others.</li>
        </ul>
        <p>We're excited to see what you'll create!</p>
        
    `
    }
    return mailOptions
}

module.exports = { mailContent }