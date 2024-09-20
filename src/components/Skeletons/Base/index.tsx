import { SkeletonProps, Skeleton as UISkeleton } from 'antd';

import './Base.scss';

interface ISkeleton extends SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}

const Skeleton = ({
  className,
  width = '100%',
  height = '200px',
  active = true,
  paragraph = false,
  borderRadius = "5px",
  ...restProps
}: ISkeleton) => {
  return (
    <UISkeleton
      active={active}
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
      paragraph={paragraph}
      {...restProps}
    />
  );
};

export default Skeleton;
