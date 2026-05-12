import type { CatCalculatorApi } from "../electron/preload";

declare global {
  interface Window {
    catCalculator: CatCalculatorApi;
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

export {};
