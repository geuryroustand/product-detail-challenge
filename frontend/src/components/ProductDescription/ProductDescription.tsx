type Props = {
  description: string;
};

const ProductDescription = ({ description }: Props) => {
  return <p>{description}</p>;
};

export default ProductDescription;
