import Title from "../Title/Title";

interface ProductInfoProps {
  title: string;
}

const ProductInfo = ({ title }: ProductInfoProps) => {
  return (
    <div>
      <Title title={title} />
    </div>
  );
};

export default ProductInfo;
