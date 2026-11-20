export const sectionNavigationEvent = "portfolio:section-navigation";

let cancelArrival: (() => void) | undefined;

function highlightOnArrival(section: HTMLElement) {
  cancelArrival?.();

  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heading = section.querySelector<HTMLElement>("h1, h2");
  if (preference.matches || !heading) return;

  const controller = new AbortController();
  let animation: Animation | undefined;
  const cleanup = () => {
    observer.disconnect();
    window.clearTimeout(timeout);
    controller.abort();
    animation?.cancel();
    if (cancelArrival === cleanup) cancelArrival = undefined;
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.6) return;
      observer.disconnect();
      window.clearTimeout(timeout);
      animation = heading.animate(
        [
          { backgroundColor: "transparent" },
          { backgroundColor: "rgba(105, 199, 213, 0.14)", offset: 0.2 },
          { backgroundColor: "transparent" }
        ],
        { duration: 480, easing: "ease-out" }
      );
      void animation.finished.then(cleanup, cleanup);
    },
    { rootMargin: "-64px 0px 0px", threshold: 0.6 }
  );
  const timeout = window.setTimeout(cleanup, 3000);
  cancelArrival = cleanup;
  observer.observe(heading);
  window.addEventListener("wheel", cleanup, { passive: true, signal: controller.signal });
  window.addEventListener("touchstart", cleanup, { passive: true, signal: controller.signal });
  window.addEventListener("pointerdown", cleanup, { passive: true, signal: controller.signal });
  window.addEventListener("keydown", cleanup, { signal: controller.signal });
  window.addEventListener("popstate", cleanup, { signal: controller.signal });
  window.addEventListener("hashchange", cleanup, { signal: controller.signal });
  preference.addEventListener("change", cleanup, { signal: controller.signal });
}

export function navigateToSection(href: string) {
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return false;

  const section = document.getElementById(url.hash.slice(1));
  if (!section) return false;

  window.dispatchEvent(new CustomEvent(sectionNavigationEvent, { detail: { id: section.id } }));
  const temporaryTabIndex = !section.hasAttribute("tabindex");
  if (temporaryTabIndex) {
    section.setAttribute("tabindex", "-1");
    section.addEventListener("blur", () => section.removeAttribute("tabindex"), { once: true });
  }
  section.focus({ preventScroll: true });
  if (window.location.hash !== url.hash) window.history.pushState(null, "", url.pathname + url.search + url.hash);
  section.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    block: "start"
  });
  highlightOnArrival(section);
  return true;
}
