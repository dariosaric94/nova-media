import React from "react";
import styles from "./grid.module.scss";

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Pass elements/childrens
   */
  xs?: number;
  /**
   * Small screen size 0px to 600px
   */
  sm?: number;
  /**
   * Small medium screen size 600px to 960px
   */
  md?: number;
  /**
   * Medium screen size 960px to 1280px
   */
  lg?: number;
  /**
   * Large screen size 1280px to 1920px and above
   */
  xl?: number;
  /**
   * Large screen size 1920px and above
   */
}

export const Column: React.FC<ColumnProps> = ({ children, xs, sm, md, lg, ...rest }) => {
  const classes = [xs ? styles[`xs-${xs}`] : "", sm ? styles[`sm-${sm}`] : "", md ? styles[`md-${md}`] : "", lg ? styles[`lg-${lg}`] : ""].filter(Boolean).join(" ");

  return (
    <div className={`${styles.gridItem} ${classes}`}>
      <div {...rest}>
        {children}
      </div>
    </div>
  );
};

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /**
   * Pass elements/childrens
   */
  gap?: number;
  /**
   * Spread elements inside container equaly by passed value
   */
}

export const Row: React.FC<RowProps> = ({ className, children, gap = 0, ...rest }) => {
  let style = {};
  if (gap !== undefined) {
    style = { "--gap": `${gap}px` };
  }
  return (
    <div className={`${styles.gridContainer} ${className}`} {...rest} style={style}>
      {children}
    </div>
  );
};
