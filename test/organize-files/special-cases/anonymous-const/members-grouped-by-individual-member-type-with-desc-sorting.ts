import { fooFeature } from "./foo-feature";
import { FooState } from "./foo-state";
import { createSelector } from "./selector-helpers";

// #region Exported Constants (3)

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

// #endregion Exported Constants
