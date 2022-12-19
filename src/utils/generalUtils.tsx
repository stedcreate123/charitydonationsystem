const GeneralUtils = {
  /**
   * Generate An Avatar URL From AN External URL
   */
  generateAvatar: (
    name: string,
    bg_color: string,
    avatar_color: string,
    bold: boolean
  ) =>
    `https://ui-avatars.com/api/?name=${name}&background=${bg_color}&color=${avatar_color}&bold=${bold}&font-size=0.33`,
};

export default GeneralUtils;
