import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { selectDiagnosisEvaluationImpacts } from '@app-module/state/external/shared/domain-value.selectors';
import {
  selectEventTypeKeys,
  selectEventTypeUrl
} from '@app-module/state/external/shared/router.selectors';
import { actionMakeDiagnosisEvaluationDataAvailable } from '@app-module/state/internal/domain-value/domain-value.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { urlParams } from '@shared-module/constants';
import { IncidentServiceK8s } from '@shared-module/services/k8s-backend/k8s-incident.service';
import { mapEvaluationImpacts } from '@shared-module/services/mappers/incidents.mapper';
import { QueryParamService } from '@shared-module/services/query-param.service';
import { SapService } from '@shared-module/services/sap.service';
import { ToastService } from '@shared-module/services/toast.service';
import { of } from 'rxjs';
import * as incidentEvaluationActions from '../external/incident-evaluation/incident-evalaution.actions';
import * as fromFeatureRouterSelectors from '../feature.router.selectors';
import * as fromFeatureIncidentsSelectors from './incidents.selectors';
import { CreateArmedIncidentActions } from '../../components/incident-create/armed/incident-create-armed.actions';
import { IncidentCreateActions } from '../../components/incident-create/incident-create.actions';
import { EscalateArmedIncidentActions } from '../../components/incident-create/incident-escalated-from-armed/incident-escalated-from-armed.actions';
import { CreateIncidentManuallyActions } from '../../components/incident-create/manual/incident-create-manual.actions';
import { CreateIncidentFromEventActions } from '../../components/incident-create/new/incident-create-new.actions';
import { CreateNotificationFromIncidentActions } from '../../components/incident-create/notification/incident-create-notification.actions';
import { IncidentListActions } from '../../components/incident-list/incident-list.actions';
import { EventTypePaths } from '../../event-type-paths';
import { mapVibrationIncidentDTOProperties } from '../../mappers/incidents.mapper';
import { WarrantyStateEnum } from '../../models/enums/warranty-state.enum';
import { Incident } from '../../models/incident.model';
import { IncidentService } from '../../services/incident.service';
import {
  actionClearIncidentSelection,
  actionIncidentListStatusFilter,
  actionIncidentSelected
} from '../external/shared/incidents.actions';
import {
  selectIsFleetOverview,
  selectIsIncidentEvaluation,
  selectIsReview
} from '../external/shared/router.selectors';
import { selectSelectedAssets } from '../feature.asset.selectors';
import { selectSiteWarrantyState } from '../feature.sites.selectors';
import {
  actionLoadEventDetailsRequest,
  actionLoadEventHasGraphRequest
} from '../internal/event/event.actions';
import { IncidentApiActions } from './incident-api.actions';
import { IncidentActions } from './incident.actions';
import { catchError, filter, first, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { IncidentStatusFilter } from 'src/app/modules/wtg-outage/models/incident-status-filter.enum';