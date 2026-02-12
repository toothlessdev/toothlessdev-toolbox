"use client";

import React, { ReactNode } from "react";
import { RuntimeException } from "./RuntimeException";

export interface RuntimeExceptionBoundaryProps {
  children?: React.ReactNode;
  onException?: (exception: RuntimeException | undefined) => ReactNode;
}

type ErrorBoundaryState = {
  exception?: RuntimeException;
  hasError: boolean;
};

export class RuntimeExceptionBoundary extends React.Component<
  RuntimeExceptionBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error instanceof RuntimeException) {
      return { hasError: true, exception: error };
    }
    return { hasError: true };
  }

  public componentDidCatch(error: Error) {
    if (error instanceof RuntimeException) {
      console.error(
        "RuntimeException caught:",
        error.exceptionCode,
        error.message,
      );
    } else {
      console.error("Unknown error caught:", error);
    }
  }

  resetException = () => {
    this.state = {
      hasError: false,
      exception: undefined,
    };
  };

  render() {
    if (this.state.hasError) {
      if (this.props.onException) {
        return this.props.onException(this.state.exception);
      }
      return null;
    }
    return this.props.children;
  }
}
