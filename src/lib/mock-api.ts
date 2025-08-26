// Mock API for image generation simulation
export interface GenerateImageRequest {
  imageDataUrl: string; // Changed from imageUrl to imageDataUrl
  style: string;
  prompt: string;
}

export interface GenerateImageResponse {
  id: string;
  imageDataUrl: string; // Changed from imageUrl to imageDataUrl
  prompt: string;
  style: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

class MockApiService {
  private abortController: AbortController | null = null;
  private retryCount = 0;
  private maxRetries = 3;

  // Simulate 20% failure rate
  private shouldFail(): boolean {
    return Math.random() < 0.2;
  }

  // Exponential backoff delay: 1s, 2s, 4s
  private getRetryDelay(): number {
    return Math.pow(2, this.retryCount) * 1000;
  }

  // Generate mock response data
  private generateMockResponse(
    request: GenerateImageRequest
  ): GenerateImageResponse {
    return {
      id: crypto.randomUUID(),
      imageDataUrl: request.imageDataUrl, // Changed from imageUrl to imageDataUrl
      prompt: request.prompt,
      style: request.style,
      createdAt: new Date().toISOString(),
    };
  }

  // Simulate API delay
  private async simulateApiDelay(abortSignal: AbortSignal): Promise<void> {
    const delay = 1000 + Math.random() * 1000; // 1-2 seconds

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(resolve, delay);

      // Listen for abort signal
      abortSignal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new Error("Request aborted"));
      });
    });
  }

  async generateImage(
    request: GenerateImageRequest,
    onRetry?: (attempt: number, delay: number) => void
  ): Promise<GenerateImageResponse> {
    this.retryCount = 0;

    while (this.retryCount <= this.maxRetries) {
      try {
        // Create new abort controller for this attempt
        this.abortController = new AbortController();

        // Simulate API delay
        await this.simulateApiDelay(this.abortController.signal);

        // Check if request was aborted during delay
        if (this.abortController.signal.aborted) {
          throw new Error("Request aborted");
        }

        // Simulate failure (20% chance)
        if (this.shouldFail()) {
          throw new Error("Model overloaded");
        }

        // Success - return mock response
        return this.generateMockResponse(request);
      } catch (error) {
        // If aborted, don't retry
        if (error instanceof Error && error.message === "Request aborted") {
          throw error;
        }

        // If max retries reached, throw error
        if (this.retryCount >= this.maxRetries) {
          throw new Error(
            `Failed after ${this.maxRetries + 1} attempts: ${
              error instanceof Error ? error.message : "Unknown error"
            }`
          );
        }

        // Increment retry count and wait before retrying
        this.retryCount++;
        const delay = this.getRetryDelay();

        // Notify about retry attempt
        if (onRetry) {
          onRetry(this.retryCount, delay);
        }

        // Wait before retry
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    throw new Error("Unexpected error in retry loop");
  }

  // Abort current request
  abort(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  // Reset retry state
  reset(): void {
    this.retryCount = 0;
    this.abortController = null;
  }
}

export const mockApiService = new MockApiService();
