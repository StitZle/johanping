import { Center, Loader } from "@mantine/core";
import React from "react";

type StateLayoutProps<T, K> = {
  data: T;
  error?: K;
  children: React.ReactNode;
  zeroStateComponent?: React.ReactElement;
  loadingComponent?: React.ReactElement;
};

//TODO add Error Component and Loading Component
const StateLayout = <T, K>({ data, error, children, zeroStateComponent, loadingComponent }: StateLayoutProps<T, K>) => {
  return (
    <>
      {data ? (
        zeroStateComponent && Array.isArray(data) && !data.length ? (
          zeroStateComponent
        ) : (
          children
        )
      ) : error ? (
        <h1>ERROR</h1>
      ) : loadingComponent ? (
        loadingComponent
      ) : (
        <Center>
          <Loader />
        </Center>
      )}
    </>
  );
};
export default StateLayout;
