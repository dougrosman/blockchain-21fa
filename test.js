// concat(prop("Author") + ", [_" + prop("Name") + "_](" + prop("Link") + ") " + if(length((prop("Page No.")) == 0, "(p. " + prop("Page No.") + ")." ,") 


concat(prop("Author") + ", [_" + prop("Name") + "_](" + prop("Source") + ")" + if(empty(prop("Page No.")), "", concat(" (p. " + prop("Page No.") + ")")) + ". _" + prop("Publisher") + "_, " + formatDate(prop("Release Date"), "MMMM DD, YYYY") + " (" + prop("Media Type") + ")")


concat(if(empty(prop("Author")), "", concat(prop("Author") + ", ")) + if(empty(prop("Title")), "", concat("[_" + prop("Title") + "_]" + "(" + prop("Source") + ")") + if(empty(prop("Page No.")), "", concat(" (p. " + prop("Page No.") + "). ")) + if(empty(prop("Timestamp")), "", concat(" (" + prop("Timestamp") + "). ")) + if(empty(prop("Publication")), "", concat("_" + prop("Publication") + "_, ")) + if(empty(prop("Published Date")), "", concat(formatDate(prop("Published Date"), "MMMM DD, YYYY") + " ")) + if(empty(prop("Media Type")), "", concat("(" + prop("Media Type") + ")"))))



// SUMMARY

concat(if(empty(prop("Author")), "", concat("**" + prop("Author") + ", ")) + if(empty(prop("Title")), "", concat("[_" + prop("Title") + "_]" + "(" + prop("Source") + ")") + if(empty(prop("Page No.")), "", concat(" (p. " + prop("Page No.") + "). ")) + if(empty(prop("Timestamp")), "", concat(" (" + prop("Timestamp") + "). ")) + if(empty(prop("Publication")), "", concat("_" + prop("Publication") + "_, ")) + if(empty(prop("Published Date")), "", concat(formatDate(prop("Published Date"), "MMMM DD, YYYY") + " ")) + if(empty(prop("Media Type")), "", concat("(" + prop("Media Type") + ")")) + "**") + if(empty(prop("Summary")), "", concat(" — " + prop("Summary"))))