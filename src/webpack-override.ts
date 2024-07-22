import { WebpackOverrideFn } from "@remotion/cli/config";
import { THEME } from "./config";

const chConfig = {
  syntaxHighlighting: {
    theme: THEME,
  },
};

export const enableMdx: WebpackOverrideFn = async (currentConfiguration) => {
  const { remarkCodeHike, recmaCodeHike } = await import("codehike/mdx");
  return {
    ...currentConfiguration,
    module: {
      ...currentConfiguration.module,
      rules: [
        ...(currentConfiguration.module?.rules
          ? currentConfiguration.module.rules
          : []),
        {
          test: /\.mdx?$/,
          use: [
            {
              loader: "@mdx-js/loader",
              options: {
                remarkPlugins: [[remarkCodeHike, chConfig]],
                recmaPlugins: [[recmaCodeHike, chConfig]],
              },
            },
          ],
        },
      ],
    },
  };
};