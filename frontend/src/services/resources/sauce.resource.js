import { CrudService } from "@/services/crud.service";

export class SauceResource extends CrudService {
  constructor() {
    super("sauces");
  }

  getSauces() {
    return this.get();
  }
}
