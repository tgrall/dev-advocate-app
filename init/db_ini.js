db.activity_types.remove({});

db.activity_types.save([
  { "_id" : "CONF", "label" : "Conference", "category" : "Market" , "type" : "Community"  },
  { "_id" : "JUG", "label" : "Java User Group", "category" : "Market" , "type" : "Community"  },
  { "_id" : "MUG", "label" : "MongoDB User Group", "category" : "Market" , "type" : "Community"  },
  { "_id" : "MTUP", "label" : "Meetup", "category" : "Market" , "type" : "Community"  },
  { "_id" : "WBR", "label" : "Webinar", "category" : "Market" , "type" : "Marketing" },
  { "_id" : "MKT_EVT", "label" : "Marketing Event", "category" : "Market" , "type" : "Marketing" },
  { "_id" : "CERT", "label" : "Certification", "category" : "Create" , "type" : "Partner"  },
  { "_id" : "PTEVT", "label" : "Partner Event", "category" : "Market" , "type" : "Partner"  },
  { "_id" : "BCP", "label" : "Bootcamp", "category" : "Enable" , "type" : "Partner" },
  { "_id" : "PTENBL", "label" : "Partner Enablement Meeting", "category" : "Enable" , "type" : "Partner"  },
  { "_id" : "PTSALES", "label" : "Partner Sales Meeting", "category" : "Sales" , "type" : "Partner"  },
  { "_id" : "SALES", "label" : "Customer Sales Meeting", "category" : "Sales" , "type" : "Sales"  },
  { "_id" : "WSHP", "label" : "Workshop", "category" : "Enable" , "type" : "Community"  },
  { "_id" : "PTWSHP", "label" : "Partner Workshop", "category" : "Enable" , "type" : "Partner"  }
  ]);
