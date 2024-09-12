import { useNavigate } from 'react-router-dom';

import { BreadcrumbProps, Button, Flex, Breadcrumb as UIBreadcrumb } from 'antd';

import { ChevronLeft } from 'lucide-react';

interface IBreadcrumbProps extends BreadcrumbProps {
  buttonBack?: boolean;
  className?: string;
}

const Breadcrumb = ({ className, buttonBack = true, ...restProps }: IBreadcrumbProps) => {
  const navigate = useNavigate();
  return (
    <Flex gap={16} align="center">
      {buttonBack && (
        <Button icon={<ChevronLeft size={17} />} onClick={() => navigate(-1)}>
          Назад
        </Button>
      )}
      <UIBreadcrumb className={`breadcrumb ${className}`} {...restProps} />
    </Flex>
  );
};

export default Breadcrumb;
