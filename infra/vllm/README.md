# vLLM Inference Service

This docker-compose configuration runs the official [`vllm/vllm-openai`](https://hub.docker.com/r/vllm/vllm-openai) image so you can serve a Hugging Face model with the OpenAI-compatible API surface. The defaults target [Qwen/Qwen2-VL-2B-Instruct](https://huggingface.co/Qwen/Qwen2-VL-2B-Instruct), which vLLM supports for multi-modal (vision + text) inference. The stack assumes you are on a Linux host with NVIDIA drivers, CUDA, and the NVIDIA Container Toolkit installed so that `vllm` can access the GPU.

## Prerequisites

- Docker with the NVIDIA Container Toolkit configured (e.g., `nvidia-container-toolkit` on Ubuntu and Docker’s default runtime set to `nvidia`).
- A Hugging Face access token with permissions to download the target model if it is gated or private.

## Usage

1. Open `.env` and confirm the GPU defaults (e.g., `VLLM_IMAGE=vllm/vllm-openai:latest`, `VLLM_DEVICE=cuda`, `VLLM_DTYPE=float16`). Add your Hugging Face token if needed.
2. Launch the service:

   ```bash
   docker compose up -d
   ```

3. The OpenAI-compatible endpoint will be available at `http://localhost:${VLLM_HOST_PORT:-8000}`.

### Configuration

All parameters can be set via environment variables (see `.env`):

- `VLLM_IMAGE` – Container image to run (defaults to `vllm/vllm-openai:latest`).
- `VLLM_MODEL` – Hugging Face model identifier you want to serve (defaults to `Qwen/Qwen2-VL-2B-Instruct`).
- `VLLM_DEVICE` – `cuda` (default) or `cpu`. Leave as `cuda` for NVIDIA hosts.
- `VLLM_DTYPE` – Precision to use (`float16`, `bfloat16`, `float32`, etc.). The default `float16` works well on modern GPUs.
- `VLLM_ADDITIONAL_ARGS` – Extra flags passed to the vLLM server, e.g. `--tensor-parallel-size 2`. For other Qwen variants keep `--trust-remote-code --enable-vision` unless you know they are unnecessary.
- `VLLM_HOST_PORT` – Host port you wish to expose (container always listens on 8000).
- `HUGGING_FACE_HUB_TOKEN` – Optional token for model download/authentication.

Model weights are cached under `infra/vllm/model-cache` so subsequent launches reuse downloads.

### Verifying the deployment

Send a quick health request:

```bash
curl http://localhost:${VLLM_HOST_PORT:-8000}/v1/models
```

If you changed the port, update the URL accordingly.
