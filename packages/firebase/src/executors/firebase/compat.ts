import { convertNxExecutor } from '@nrwl/devkit';
import { default as runExecutor } from './executor';

export default convertNxExecutor(runExecutor);
