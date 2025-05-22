# PPanayotov.com

**PPanayotov.com** is an open-source, minimalist personal website and CV builder. It allows individuals to create a clean, professional online presence without the complexity of databases or heavy infrastructure. Ideal for developers, freelancers, and anyone looking to maintain a simple digital profile.

---

## ✨ Features

- **Database-less architecture**  
  No database is required. All content is managed through editable files, making it lightweight and easy to deploy.

- **Secure Admin Panel**  
  A basic admin panel is available, secured by a password stored in a `.env` file.

- **Instant Deployment**  
  Compatible with serverless platforms like [Vercel](https://vercel.com), allowing fast, free deployment with minimal setup.

- **Clean UI with Expandable Sections**  
  Designed for clarity and professionalism, with optional future sections for customization.

> ⚠️ **Security Note:**  
> It is strongly recommended not to upload the `admin/` folder to your production server unless properly secured. You can run the admin interface locally or restrict access during deployment.

---

## 🚧 To-Do

Planned features under development:

- [ ] Add image upload support (e.g., profile picture)
- [ ] Expand contact and social media link options
- [ ] Add AI assistance to improve and polish CV text
- [ ] Introduce multiple visual templates for printable CVs

Have an idea? [Open an issue](https://github.com/index-panayotov/ppanayotov-com/issues) or contribute directly!

---

## 🧱 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) – React-based frontend framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework
- **Hosting**: [Vercel](https://vercel.com/) – Serverless deployment platform
- **Authentication**: Environment variable-based password protection for admin panel

---

## 🚀 Getting Started

To run the project locally:

1. **Clone the repository**

```bash
git clone [https://github.com/your-username/ppanayotov-com.git](https://github.com/index-panayotov/ppanayotov-com.git)
cd ppanayotov-com
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file at the root of your project:

```env
ADMIN_PASSWORD=your-secure-password
```

4. **Run the development server**

```bash
npm run dev
```
Make all changes.
Visit `http://localhost:3000` to view your site.

```bash
npm run build
```
To build your project and deploy it.
---

## 📁 Folder Structure

```
/app            → Main application (routing, layouts, API, admin)
/components     → Reusable UI and admin components
/data           → Static data files (CV, skills, user profile)
/hooks          → Custom React hooks
/lib            → Utility functions and helpers
/public         → Static assets (images, icons, etc.)
/styles         → Global and component styles
/types          → TypeScript type definitions
.env            → Environment variables (e.g., admin password)
```

---

## 📦 Deployment

You can deploy this project to [Vercel](https://vercel.com) with one click:

1. Push your forked repository to GitHub.
2. Go to [vercel.com/import](https://vercel.com/import) and import your GitHub project.
3. Set the `ADMIN_PASSWORD` environment variable in Vercel.
4. Deploy and enjoy your personal CV site.

---

## 🔗 Live Example

You can see the latest live version at:  
🌐 [https://www.ppanayotov.com](https://www.ppanayotov.com)

---

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

- Submit feature requests or bug reports
- Improve styling or layout
- Refactor code or optimize performance
- Help write documentation

Please fork the repository and open a pull request with your improvements. Don’t forget to update the `README.md` if needed.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Thanks to all contributors and open-source libraries that make this project possible.
