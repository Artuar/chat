/** Global definitions for development **/

// for style loader
declare module '*.scss' {
  const classes: { [key: string]: string };
  export = classes;
}

declare module '*.css' {
  const classes: { [key: string]: string };
  export = classes;
}
