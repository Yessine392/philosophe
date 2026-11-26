import { createRoot } from "react-dom/client";
import { Component, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { currentRoute, getVersion, subscribe } from "./router-store";
import { installSampleBridge } from "./sample-bridge";
import { NotFoundError } from "./shims/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Home from "@/app/page";
import NotFound from "@/app/not-found";
import ParcoursPage from "@/app/parcours/page";
import PathPage from "@/app/parcours/[path]/page";
import LessonPage from "@/app/parcours/[path]/[lesson]/page";
import PhilosophesPage from "@/app/philosophes/page";
import PhilosophePage from "@/app/philosophes/[slug]/page";
import DialoguePage from "@/app/dialogue/[slug]/page";
import AgoraPage from "@/app/agora/page";
import ConceptsPage from "@/app/concepts/page";
import FrisePage from "@/app/frise/page";
import CarnetPage from "@/app/carnet/page";

installSampleBridge();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPage = (props: any) => ReactNode | Promise<ReactNode>;
const pages: Record<string, AnyPage> = {
  accueil: Home,
  parcours: ParcoursPage,
  "parcours-detail": PathPage,
  lecon: LessonPage,
  philosophes: PhilosophesPage,
  philosophe: PhilosophePage,
  dialogue: DialoguePage,
  agora: AgoraPage,
  concepts: ConceptsPage,
  frise: FrisePage,
  carnet: CarnetPage,
};

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <NotFound /> : this.props.children;
  }
}

function App() {
  const version = useSyncExternalStore(subscribe, getVersion, getVersion);
  const [view, setView] = useState<{ key: string; node: ReactNode } | null>(null);

  useEffect(() => {
    let alive = true;
    const route = currentRoute();
    const Page = pages[route.name];
    const key = `${route.pathname}?${(window as Window & { __philoSearch?: string }).__philoSearch}#${version}`;
    const render = async () => {
      if (!Page) return <NotFound />;
      try {
        return await Page({ params: Promise.resolve(route.params), searchParams: Promise.resolve({}) });
      } catch (e) {
        if (e instanceof NotFoundError) return <NotFound />;
        throw e;
      }
    };
    render().then((node) => {
      if (!alive) return;
      setView({ key, node });
      const titles: Record<string, string> = { accueil: "Philosophe" };
      document.title = titles[route.name] ?? "Philosophe";
    });
    return () => {
      alive = false;
    };
  }, [version]);

  return (
    <>
      <div className="cosmos" aria-hidden />
      <Nav />
      <main className="flex-1">
        {view && (
          <Boundary key={view.key}>
            <div key={view.key}>{view.node}</div>
          </Boundary>
        )}
      </main>
      <Footer />
    </>
  );
}

const root = document.getElementById("root")!;
createRoot(root).render(<App />);
