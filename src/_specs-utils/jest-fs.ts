import fs from "fs";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBePath(): R;
      toBeDirectory(): R;
      toBeDirectoryWithFiles(files: string[]): R;
    }
  }
}

expect.extend({
  toBePath(received) {
    const pass = fs.existsSync(received);
    const failMessage = this.isNot
      ? "expected #{this} not to exist"
      : "expected #{this} to exist";

    const message = pass ? "" : failMessage;
    return { pass, actual: received, message: () => message };
  },

  toBeDirectory(received) {
    expect(received).toEqual(expect.any(String));
    expect(received).toBePath();

    const pass = fs.statSync(received).isDirectory();
    const failMessage = this.isNot
      ? "Expected Not: to be directory"
      : "Expected: to be directory";

    const message = pass ? "good" : failMessage;
    return { pass, actual: received, message: () => message };
  },

  toBeDirectoryWithFiles(received, actual) {
    expect(received).toBeDirectory();

    const files = fs.readdirSync(received);
    expect(files).toEqual(expect.arrayContaining(actual));
    return { pass: true, actual: received, message: () => "good" };
  },
});
