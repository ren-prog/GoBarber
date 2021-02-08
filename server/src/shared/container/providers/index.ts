import { container } from "tsyringe";

import DiskStorageProvider from "./storageProvider/implementations/DiskStorageProvider";
import IStorageProvider from "./storageProvider/models/IStorageProvider";

import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import IMailProvider from "./MailProvider/models/IMailProvider";

import IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandlebarsMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  DiskStorageProvider
);

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  HandlebarsMailTemplateProvider
);

container.registerInstance<IMailProvider>(
  "MailProvider",
  container.resolve(EtherealMailProvider)
);
