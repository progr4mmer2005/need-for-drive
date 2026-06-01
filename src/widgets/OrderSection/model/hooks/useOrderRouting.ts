import { useCallback, useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_SEGMENT_TO_STEP, STEP_ROUTE_SEGMENTS, type TOrderFlowStep } from '../types';
import type { TOrderState } from './useOrderState';

type TRoutingParams = {
  step: number;
  stepSlug: string | undefined;
  setOrderState: Dispatch<SetStateAction<TOrderState>>;
  canGoToStep2: boolean;
  canGoToStep3: boolean;
  canGoToStep4: boolean;
};

function resolveGuardedStep(
  stepSlug: string | undefined,
  maxAvailableStep: TOrderFlowStep
): TOrderFlowStep {
  if (!stepSlug) return 1;
  const raw = ROUTE_SEGMENT_TO_STEP[stepSlug];
  if (!raw) return maxAvailableStep;
  return raw <= maxAvailableStep ? raw : maxAvailableStep;
}

export function useOrderRouting({
  step,
  stepSlug,
  setOrderState,
  canGoToStep2,
  canGoToStep3,
  canGoToStep4,
}: TRoutingParams) {
  const navigate = useNavigate();

  const replaceOrderRouteStep = useCallback(
    (targetStep: TOrderFlowStep) => {
      navigate(`/order/${STEP_ROUTE_SEGMENTS[targetStep]}`, { replace: true });
    },
    [navigate]
  );

  const maxAvailableStep = useMemo<TOrderFlowStep>(() => {
    if (canGoToStep4) return 4;
    if (canGoToStep3) return 3;
    if (canGoToStep2) return 2;
    return 1;
  }, [canGoToStep2, canGoToStep3, canGoToStep4]);

  const isStepEnabled = useCallback(
    (stepIndex: TOrderFlowStep) => stepIndex <= maxAvailableStep,
    [maxAvailableStep]
  );

  const handleStepTransition = useCallback(
    (nextStep: TOrderFlowStep) => {
      if (!isStepEnabled(nextStep)) return;
      replaceOrderRouteStep(nextStep);
    },
    [isStepEnabled, replaceOrderRouteStep]
  );

  useEffect(() => {
    if (step === 5) return;

    if (stepSlug && !ROUTE_SEGMENT_TO_STEP[stepSlug]) {
      replaceOrderRouteStep(maxAvailableStep);
      return;
    }

    const guardedStep = resolveGuardedStep(stepSlug, maxAvailableStep);

    if (step !== guardedStep) {
      setOrderState((prev) => ({ ...prev, step: guardedStep }));
    }

    if (stepSlug !== STEP_ROUTE_SEGMENTS[guardedStep]) {
      replaceOrderRouteStep(guardedStep);
    }
  }, [maxAvailableStep, step, replaceOrderRouteStep, stepSlug, setOrderState]);

  return {
    replaceOrderRouteStep,
    maxAvailableStep,
    isStepEnabled,
    handleStepTransition,
  };
}
