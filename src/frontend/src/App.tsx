import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import CartPage from "@/pages/Cart";
import CatalogPage from "@/pages/Catalog";
import CheckoutPage from "@/pages/Checkout";
import OrderConfirmationPage from "@/pages/OrderConfirmation";
import ProductDetailPage from "@/pages/ProductDetail";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: Layout,
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: CatalogPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$id",
  component: ProductDetailPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order/$id",
  component: OrderConfirmationPage,
});

const routeTree = rootRoute.addChildren([
  catalogRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  orderRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
