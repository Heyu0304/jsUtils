import { MobXProviderContext } from "mobx-react";
import React from "react";

export function useStores(name) {
    return React.useContext(MobXProviderContext)[name];
}

export function useGlobalStore() {
    return React.useContext(MobXProviderContext);
}