/* globals mocha */

export { loadTests } from './test-loader';

import { loadTests } from './test-loader';
import describeModule from 'ember-mocha/describe-module';
import describeComponent from 'ember-mocha/describe-component';
import describeModel from 'ember-mocha/describe-model';
import setupTestFactory from 'ember-mocha/setup-test-factory';
import setupTestNew from 'ember-mocha/setup-test';
import setupRenderingTest from 'ember-mocha/setup-rendering-test';
import setupApplicationTest from 'ember-mocha/setup-application-test';
import { it, afterEach } from 'mocha';
import { setResolver, resetOnerror } from '@ember/test-helpers';
import {
  TestModule,
  TestModuleForModel,
  TestModuleForComponent,
  TestModuleForAcceptance,
} from 'ember-test-helpers';

const setupTestLegacy = setupTestFactory(TestModule);
const setupAcceptanceTest = setupTestFactory(TestModuleForAcceptance);
const setupComponentTest = setupTestFactory(TestModuleForComponent);
const setupModelTest = setupTestFactory(TestModuleForModel);

// wrapper function that supports the old and the new testing APIs, depending on its arguments
function setupTest(moduleName) {
  // when the first argument is a string, this is the old testing API
  if (typeof moduleName === 'string') {
    return setupTestLegacy(...arguments);
  }
  return setupTestNew(...arguments);
}

/**
 * Instruct Mocha to start the tests.
 */
export function startTests() {
  mocha.run();
}

function setupResetOnerror() {
  afterEach(function() {
    resetOnerror();
  });
}

/**
 * @method start
 * @param {Object} [options] Options to be used for enabling/disabling behaviors
 * @param {Boolean} [options.loadTests] If `false` tests will not be loaded automatically.
 * @param {Boolean} [options.startTests] If `false` tests will not be automatically started
 * (you must run `startTests()` to kick them off).
 */
export function start(options = {}) {
  setupResetOnerror();

  if (options.loadTests !== false) {
    loadTests();
  }

  if (options.startTests !== false) {
    startTests();
  }
}

export {
  describeModule,
  describeComponent,
  describeModel,
  setupTest,
  setupTestLegacy,
  setupAcceptanceTest,
  setupComponentTest,
  setupModelTest,
  setupRenderingTest,
  setupApplicationTest,
  it,
  setResolver,
};
