/**
 * Interface for disposable resources that need cleanup
 */
export interface Disposable {
  dispose(): void;
}

/**
 * Composite disposable that manages multiple disposables
 */
export class CompositeDisposable implements Disposable {
  private disposables: Disposable[] = [];

  add(disposable: Disposable): void {
    this.disposables.push(disposable);
  }

  dispose(): void {
    for (const disposable of this.disposables) {
      try {
        disposable.dispose();
      } catch (e) {
        console.warn('Error disposing resource:', e);
      }
    }
    this.disposables = [];
  }
}
