import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const PageWithTransition=({Component, pageProps}:AppProps)=>{
    const router=useRouter()
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        // 👇 this handler will create a transition effect between route changes,
        // so that it doesn't automatically display the next screen.
        const handler = () => {
          setTransitioning(true);
          setTimeout(() => {
            setTransitioning(false);
          }, 280);
        };
        router.events.on("routeChangeComplete", handler);
        return () => {
          router.events.off("routeChangeComplete", handler);
        };
      }, [router.events]);

      const Loading = () => <div className="container mx-auto">Loading...</div>;

      const Screen = !transitioning ? Component : Loading;
      return (
        <div>
          <Screen {...pageProps} />
        </div>
      );

}

export default PageWithTransition;