export default class Disposable {
  _disposed = false;
  _callbacks = [];

  isDisposed() {
    return this._disposed;
  }

  dispose() {
    if (!this._disposed) {
      this._disposed = true;
      this._executeCallbacks();
    }
  }

  addOnDisposeCallback(callback, context) {
    if (this._disposed) {
      if (context !== undefined) {
        callback.call(context);
      } else {
        callback();
      }
    } else {
      if (this._callbacks == null) {
        this._callbacks = [];
      }
      this._callbacks.push(context !== undefined ? callback.bind(context) : callback);
    }
  }

  _executeCallbacks() {
    if (this._callbacks) {
      while (this._callbacks.length > 0) {
        const callback = this._callbacks.shift();
        if (callback) callback();
      }
    }
  }
}

export function CreateDisposeCallback(targetObject, objectToDispose) {
  targetObject.addOnDisposeCallback(function() {
    objectToDispose.dispose();
  });
}