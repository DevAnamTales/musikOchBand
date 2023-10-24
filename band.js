export default class Band {

  constructor(name, info, formedYear, resolvedYear = null) {
    this.name = name;
    this.info = info;
    this.formedYear = formedYear;
    this.resolvedYear = resolvedYear;
    this.members = [];
    this.formerMembers = [];
  }
  
  getName() {
    return this.name;
  }
}