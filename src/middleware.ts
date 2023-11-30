import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // set all posts/* routes to public with regex
  publicRoutes: ["/", "/post/:slug"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
