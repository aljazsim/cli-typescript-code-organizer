import { FooState } from "./foo-state";
import { fooFeature } from "./foo-feature";
import { createSelector } from "./selector-helpers";

export const {
    selectFooCategories,
    selectFooState
} = fooFeature;

export const selectFooLoading = createSelector(
    selectFooState,
    (state: FooState) =>
    {
        return Object.values(state.loading).some(isLoading => isLoading);
    }
);

export const selectFooDomainValuesLoaded = createSelector(
    selectFooState,
    (state: FooState) =>
        state.fooCategories?.length > 0 &&
        state.fooImpacts?.length > 0 &&
        state.fooPendingStatusList?.length > 0
);
