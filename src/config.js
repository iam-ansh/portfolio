const env = import.meta.env;

export const config = {
  githubUser: env.VITE_GITHUB_USER,
  email: env.VITE_EMAIL,

  linkedinHandle: (env.VITE_LINKEDIN_HANDLE || "").replace(/^\/+|\/+$/g, "").replace(/^in\//, ""),
  linkedinConnections: env.VITE_LINKEDIN_CONNECTIONS,
  maxRepos: 5,
  phrases: ["machine learning models", "Node.js backends", "things for the web"],
};
