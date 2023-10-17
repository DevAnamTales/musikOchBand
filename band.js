export default class Band {

  constructor(name, info, formedYear, seperatedYear, members, formerMembers) {
    this.name = name;
    this.info = info;
    //this.formedYear = formedYear;
    //this.seperatedYear = seperatedYear;
    this.members = [];
    //this.formerMembers = formerMembers;
  }
  dataInfo() {
    return {
      "name": this.name,
      "info": this.info
    };
  }
}

