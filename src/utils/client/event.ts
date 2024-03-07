import { Metadata } from "next";

export function eventWindowBeforeClose(callback: Function) {
  if (!window) return;

  window.addEventListener("unload", (event) => {
    event.preventDefault();

    callback();
  });
}

export function eventGenerateMetadata(title?: string, description?: string) {
  const APP_NAME = "Masakin";
  const APP_DEFAULT_TITLE = title || "Masakin";
  const APP_TITLE_TEMPLATE = title || "%s - Masakin";
  const APP_DESCRIPTION = description || "Cari resep yang kamu makan";
  const APP_IMAGE = "/img/meta.png";

  const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: "/manifest.json",
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_DEFAULT_TITLE,
      // startUpImage: [],
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
      images: APP_IMAGE,
    },
    twitter: {
      card: "summary",
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
      images: APP_IMAGE,
    },
  };

  return metadata;
}
