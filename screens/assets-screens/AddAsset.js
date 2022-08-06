/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import AssetForm from "../../components/functional/AssetsComponents/AssetForm";

function AddAsset({ navigation }) {
  function createAssetHandler(asset) {
    navigation.navigate("AllAssets", {
      //asset data being sent to 'All Assets screen
      asset: asset,
    });
  }
  return <AssetForm onCreateAsset={createAssetHandler} />;
}

export default AddAsset;
