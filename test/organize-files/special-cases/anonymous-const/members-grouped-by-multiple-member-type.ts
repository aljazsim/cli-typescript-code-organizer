import { fooFeature } from "./foo-feature";
import { FooState } from "./foo-state";
import { createSelector } from "./selector-helpers";

// #region Variables (3)

export const {
    selectFooCategories,
    selectFooState
} = fooFeature;
export const selectFooDomainValuesLoaded = createSelector(
    selectFooState,
    (state: FooState) =>
        state.fooCategories?.length > 0 &&
        state.fooImpacts?.length > 0 &&
        state.fooPendingStatusList?.length > 0
);
export const selectFooLoading = createSelector(
    selectFooState,
    (state: FooState) =>
    {
        return Object.values(state.loading).some(isLoading => isLoading);
    }
);

// #endregion Variables
