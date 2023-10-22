export default class Band {

  constructor(name, info, formedYear, resolvedYear = null) {
    this.name = name;
    this.info = info;
    this.formedYear = formedYear;
    this.resolvedYear = resolvedYear;
    this.members = [];
    this.formerMembers = [];
  }
  /*   dataInfo() {
      return {
        "id": this.id,
        "name": this.name,
        "info": this.info,
        members: this.members.map(member => member.dataInfo()) // Serialize band members
  
      };
    } */
  getName() {
    return this.name;
  }
  }