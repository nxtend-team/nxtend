import { logger, stripIndents } from '@nrwl/devkit';

export default function update() {
  logger.info(stripIndents`
    Capacitor 3 has been released and it is recommended that you upgrade your application if you have not already.
    You will need to upgrade before using the new run command.
    
    https://capacitorjs.com/docs/updating/3-0
    `);
}
