import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** @type {import('eslint').Linter.Plugin} */
const noLineCommentsPlugin = {
  rules: {
    "no-line-comments": {
      meta: {
        type: "suggestion",
        docs: { description: "Disallow // comments, use /** */ JSDoc instead" },
        messages: {
          useJsdoc: "Use /** */ JSDoc comments instead of // line comments.",
        },
      },
      create(context) {
        const sourceCode = context.sourceCode ?? context.getSourceCode();
        return {
          Program() {
            for (const comment of sourceCode.getAllComments()) {
              if (comment.type === "Line") {
                context.report({ node: comment, messageId: "useJsdoc" });
              }
            }
          },
        };
      },
    },
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "custom": noLineCommentsPlugin,
    },
    rules: {
      "custom/no-line-comments": "error",
      "multiline-comment-style": ["error", "starred-block"],
    },
  },
]);

export default eslintConfig;
