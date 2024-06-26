export class DataConfigManager {
  constructor(config = {}){
    this.url = config.url || "";
    this.args = config.args || {};
    this.assets = config.assets || {};
  }
}

export function CreateDataConfigManager(config){
  if(config instanceof DataConfigManager){
    return config;
  } 
  return new DataConfigManager(config)
}