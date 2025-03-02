/*******************************************************************************
 * Copyright (c) 2025. My Corporation.
 */

import type { IType1 } from "./IType1.ts";
import { type IType2, convertToType1 } from "./IType2.ts";
import { TokenEnum } from "./TokenEnum.ts";
import { createWorker } from "./helpers/WorkerCreator";

export class Token extends TokenEnum implements IType1, IType2 {
    // #region Public Methods (1)

    public push(item: string) {
        return convertToType1(item) + createWorker(item);
    }

    // #endregion Public Methods
}
