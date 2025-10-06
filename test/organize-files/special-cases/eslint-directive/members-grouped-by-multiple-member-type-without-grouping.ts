/* eslint-disable max-lines */
@Injectable({
  providedIn: 'root'
})
export class WebSocketNotifier {
  // #region Constructors (1)

  public constructor (
    private readonly captureMapper: CaptureMapper,
    private readonly restartInferenceMapper: RestartInferenceMapper,
    private readonly aiModelMapper: AiModelMapper,
    private readonly trainingMapper: TrainingsMapper,
    private readonly recalibrationMapper: RecalibrationsMapper,
    private readonly storedResultMapper: StoredResultMapper,
    private readonly pureImageMapper: PureImageMapper,
    @Inject(WS_CONFIGURATION_TOKEN)
    private readonly clientConfig: WsConfiguration,
    private readonly store: Store
  ) {}

  // #endregion Constructors

  // #region Methods (1)

  // HACK : all topics mappings
  // eslint-disable-next-line complexity, max-lines-per-function
  public notify (topic: string, entity: unknown): void {
    if(topic===this.clientConfig.topics.storedResult) {
      const model=this.storedResultMapper.mapToPartialModel(entity as PartialStoredResultEntity);

      this.store.dispatch(ResultActions.onStoredResultReceived({
        result: model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.restartedInference.started) {
      const model = this.restartInferenceMapper.mapStartedToModel(entity as RestartedInferenceStartedEntity);
      this.store.dispatch(RestartedInferenceActions.onRestartedInferenceStartedReceived({
        model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.restartedInference.updated) {
      const model = this.restartInferenceMapper.mapUpdatedToModel(entity as RestartedInferenceUpdatedEntity);
      this.store.dispatch(RestartedInferenceActions.onRestartedInferenceUpdatedReceived({
        model
      }));
      return;
    }

    if(topic === this.clientConfig.topics.restartedInference.cancelled) {
      const model=this.restartInferenceMapper.mapCancelledToModel(
        entity as RestartedInferenceCancelledEntity
      );
      this.store.dispatch(RestartedInferenceActions.onRestartedInferenceCancelledReceived({
        inferenceId: model.restartedInferenceId
      }));
      return;
    }

    if(topic===this.clientConfig.topics.restartedInference.ended) {
      const model = this.restartInferenceMapper.mapEndedToModel(entity as RestartedInferenceEndedEntity);
      this.store.dispatch(RestartedInferenceActions.onRestartedInferenceEndedReceived({
        id: model.restartedInferenceId
      }));
      return;
    }

    if(topic===this.clientConfig.topics.capture) {
      const model = this.captureMapper.mapToModel(entity as CaptureSummaryEntity);
      this.store.dispatch(ResultActions.onCaptureSummaryReceived({
        capture: model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.pureImage) {
      const model = this.pureImageMapper.mapToModel(entity as PureImageEntity);
      this.store.dispatch(ResultActions.onPureImageReceived({
        result: model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.training.updated) {
      const model = this.trainingMapper.mapToUpdatedModel(entity as TrainingUpdatedEntity);
      this.store.dispatch(TrainingsListActions.onTrainingUpdatedReceived({
        model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.training.succeeded) {
      const model = this.trainingMapper.mapToSucceededModel(entity as TrainingSucceededEntity);
      this.store.dispatch(TrainingsListActions.onTrainingSucceededReceived({
        model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.training.starting) {
      const model = this.trainingMapper.mapToStartingModel(entity as TrainingStartingEntity);
      this.store.dispatch(TrainingsListActions.onTrainingStartingReceived({
        model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.training.failed) {
      const model = this.trainingMapper.mapToFailedModel(entity as TrainingFailedEntity);
      this.store.dispatch(TrainingsListActions.onTrainingFailedReceived({
        model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.training.cancelled) {
      const model = this.trainingMapper.mapToCancelledModel(entity as TrainingCancelledEntity);
      this.store.dispatch(TrainingsListActions.onTrainingCancelledReceived(model));
      return;
    }

    if(topic===this.clientConfig.topics.aiModel.activating) {
      const model = this.aiModelMapper.mapToActivatingModel(entity as AiModelActivatingEntity);
      this.store.dispatch(AiModelsListActions.onAiModelActivatingReceived(model));
      return;
    }

    if(topic===this.clientConfig.topics.aiModel.activated) {
      const model = this.aiModelMapper.mapToActivatedModel(entity as AiModelActivatedEntity);
      this.store.dispatch(AiModelsListActions.onAiModelActivatedReceived(model));
      return;
    }

    if(topic===this.clientConfig.topics.aiModel.deactivated) {
      const model = this.aiModelMapper.mapToDeactivatedModel(entity as AiModelDeactivatedEntity);
      this.store.dispatch(AiModelsListActions.onAiModelDeactivatedReceived(model));
      return;
    }

    if(topic===this.clientConfig.topics.aiModel.selected) {
      const model = this.aiModelMapper.mapToSelectedModel(entity as AiModelSelectedEntity);
      this.store.dispatch(AiModelsListActions.onAiModelSelectedReceived(model));
      return;
    }

    if(topic===this.clientConfig.topics.aiModel.unselected) {
      const model = this.aiModelMapper.mapToUnselectedModel(entity as AiModelUnselectedEntity);
      this.store.dispatch(AiModelsListActions.onAiModelUnselectedReceived(model));
      return;
    }

    if(topic===this.clientConfig.topics.recalibration.starting) {
      const model = this.recalibrationMapper.mapToStartingModel(entity as RecalibrationStartingEntity);
      this.store.dispatch(RecalibrateActions.onStarting({
        data: model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.recalibration.succeeded) {
      const model = this.recalibrationMapper.mapToEndedModel(entity as RecalibrationSuccededEntity);
      this.store.dispatch(RecalibrateActions.onSucceded({
        data: model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.recalibration.failed) {
      const model = this.recalibrationMapper.mapToFailedModel(entity as RecalibrationFailedEntity);
      this.store.dispatch(RecalibrateActions.onFailed({
        data: model
      }));
      return;
    }

    if(topic===this.clientConfig.topics.recalibration.updated) {
      const model = this.recalibrationMapper.mapToUpdatedModel(entity as RecalibrationUpdatedEntity);
      this.store.dispatch(RecalibrateActions.onUpdated({
        data: model
      }));
      return;
    }

    console.error('ws message not parsable');
  }

  // #endregion Methods
}
