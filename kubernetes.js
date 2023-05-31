const k8s = require('@kubernetes/client-node');

async function createDeployment() {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();

  const k8sApi = kc.makeApiClient(k8s.AppsV1Api);

  const deployment = {
    metadata: {
      name: 'my-deployment',
      namespace: 'default',
    },
    spec: {
      replicas: 3,
      selector: {
        matchLabels: {
          app: 'my-app',
        },
      },
      template: {
        metadata: {
          labels: {
            app: 'my-app',
          },
        },
        spec: {
          containers: [
            {
              name: 'my-container',
              image: 'nginx',
              ports: [
                {
                  containerPort: 80,
                },
              ],
            },
          ],
        },
      },
    },
  };

  try {
    const response = await k8sApi.createNamespacedDeployment('default', deployment);
    console.log('Deployment created:', response.body.metadata.name);
  } catch (error) {
    console.error('Error creating deployment:', error.response.body.message);
  }
}

createDeployment();
