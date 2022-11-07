import { CopyOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Tooltip,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import GardensService from "../../api/gardens/GardensService";
import {
  GardenAddType,
  GardenUpdateType,
  IGarden,
} from "../../api/gardens/models";
import { ISector } from "../../api/sectors/models";
import BackButton from "../BackButton/BackButton";
import cryptoRandomString from "crypto-random-string";

interface FormValues {
  name: string;
  description: string;
  location: string;
  sectors: ISector[];
}

const formItemLayout = {
  wrapperCol: { xs: 24, sm: 24, md: 24, lg: 20 },
  labelCol: { xs: 24, sm: 24, md: 24, lg: 4 },
};

const GardenDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [form] = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [garden, setGarden] = useState<IGarden>({
    gardenId: 0,
    location: "",
    description: "",
    sectors: [],
    ownerUserId: 0,
    name: "",
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      if (id) {
        const entity: GardenUpdateType = {
          gardenId: +id,
          name: values.name,
          description: values.description,
          location: values.location,
          sectors: values.sectors.map((sector) => {
            return {
              sectorId: sector.sectorId,
              name: sector.name,
              centralizerKey: sector.centralizerKey,
              crops: sector.crops,
              gardenId: sector.gardenId,
            };
          }),
        };
        await GardensService.update(id, entity);
      } else {
        const entity: GardenAddType = {
          name: values.name,
          description: values.description,
          location: values.location,
          sectors: values.sectors.map((sector) => {
            return {
              sectorId: sector.sectorId,
              name: sector.name,
              centralizerKey: sector.centralizerKey,
              crops: sector.crops,
              gardenId: sector.gardenId,
            };
          }),
        };
        await GardensService.add(entity);
      }

      message.success("Operación exitosa");
      navigate(-1);
    } catch (error) {
      if (error.message) message.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    message.success("Copiado al portapapeles");
  };

  const handleDelete = async (id: string) => {
    try {
      setIsSubmitting(true);
      await GardensService.delete(id);
      message.success("Operación exitosa");
      navigate(-1);
    } catch (error) {
      if (error.message) message.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchGarden = async () => {
      if (id) {
        try {
          setIsLoading(true);
          const response = await GardensService.fetchOne(id);
          setGarden(response);
        } catch (error) {
          if (error.message) message.error(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchGarden();
  }, [id]);

  return (
    <div className="container">
      <Card title={<BackButton title="Huerta" />} loading={isLoading}>
        <Form
          form={form}
          onFinish={(values: FormValues) => handleSubmit(values)}
          {...formItemLayout}
          initialValues={garden}
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Complete este campo" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="description"
            rules={[{ required: true, message: "Complete este campo" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ubicación"
            name="location"
            rules={[{ required: true, message: "Complete este campo" }]}
          >
            <Input />
          </Form.Item>
          <Form.List name="sectors">
            {(sectors, { add, remove }) => (
              <>
                {sectors.map(({ key, name }) => (
                  <>
                    <Divider>Datos del sector</Divider>
                    <Form.Item
                      label="Nombre"
                      name={[name, "name"]}
                      rules={[{ required: true, message: "Campo obligatorio" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Cultivos"
                      name={[name, "crops"]}
                      rules={[{ required: true, message: "Campo obligatorio" }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Clave Centralizador"
                      name={[name, "centralizerKey"]}
                      extra="Esta clave deberá ser programada en la placa de la huerta inteligente"
                      rules={[{ required: true, message: "Campo obligatorio" }]}
                      initialValue={
                        (form.getFieldValue("sectors") as ISector[]).at(key)
                          ? (form.getFieldValue("sectors") as ISector[]).at(
                              key
                            )!.centralizerKey
                          : cryptoRandomString({ length: 64 })
                      }
                    >
                      <Input
                        disabled
                        readOnly
                        // addonAfter={
                        //   <Tooltip title="Copiar">
                        //     <CopyOutlined style={{ cursor: "pointer" }} />
                        //   </Tooltip>
                        // }
                      />
                    </Form.Item>

                    <Popconfirm
                      title="¿Desea eliminar el sector? La acción no tiene vuelta atrás"
                      cancelText="Cancelar"
                      onConfirm={() => remove(name)}
                    >
                      <Button
                        danger
                        shape="circle"
                        style={{ marginBottom: 10, width: 0 }}
                        loading={isSubmitting}
                        type="primary"
                        block
                        icon={<MinusOutlined />}
                      />
                    </Popconfirm>
                  </>
                ))}

                <Row gutter={12} style={{ justifyContent: "center" }}>
                  <Col xs={24} md={12} lg={6}>
                    <Button
                      disabled={sectors.length >= 3}
                      loading={isSubmitting}
                      style={{ marginTop: 10 }}
                      type="primary"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Añadir sector
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>
          <Divider />
          <>
            {!!id && (
              <Popconfirm
                title="¿Eliminar Huerta?"
                onConfirm={() => handleDelete}
                cancelText="Cancelar"
              >
                <Button type="primary" danger loading={isSubmitting}>
                  Eliminar
                </Button>
              </Popconfirm>
            )}
            <Button
              htmlType="submit"
              loading={isSubmitting}
              type="primary"
              style={{ float: "right" }}
            >
              Guardar
            </Button>
          </>
        </Form>
      </Card>
    </div>
  );
};

export default GardenDetail;
