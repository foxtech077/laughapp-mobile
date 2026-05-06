import { ReactNode, FC } from "react";

type ProviderComponent<P = {}> = FC<P & { children: ReactNode }>;

const combineComponents = (
  ...components: ProviderComponent<any>[]
): ProviderComponent<any> => {
  return components.reduce<ProviderComponent<any>>(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children, ...rest }: any) => (
        <AccumulatedComponents {...rest}>
          <CurrentComponent {...rest}>{children}</CurrentComponent>
        </AccumulatedComponents>
      );
    },
    ({ children }: { children: ReactNode }) => <>{children}</>,
  );
};

const providers: ProviderComponent<any>[] = [];

export const AppContextProvider = combineComponents(...providers);
